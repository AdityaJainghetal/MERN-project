import Stripe from "stripe";
import { Course } from "../models/courseModel.js";
import { CoursePurchase } from "../models/PurchaseCourseModel.js";
import { Lecture } from "../models/lectureModel.js";
import { User } from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course)
      return res.status(404).json({
        message: "Course not found",
      });

    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    //     const session = await stripe.checkout.sessions.create({
    //       payment_method_types: ["card"],
    //       line_items: [
    //         {
    //           price_data: {
    //             currency: "inr",
    //             product_data: {
    //               name: course.courseTitle,
    //               images: [course.courseThumbnail],
    //             },
    //             unit_amount: course.coursePrice * 100,
    //           },
    //           quantity: 1,
    //         },
    //       ],
    //       mode: "payment",
    //       // success_url: ` http://localhost:5173/course-progress/${courseId}`,
    //       // cancel_url: ` http://localhost:5173/course-detail/${courseId}`,
    //       success_url: `http://localhost:5173/course-progress/${courseId}`,
    // cancel_url: `http://localhost:5173/course-detail/${courseId}`,

    //       metadata: {
    //         courseId: courseId,
    //         userId: userId,
    //       },
    //       shipping_address_collection: {
    //         allowed_countries: ["IN"],
    //       },
    //     });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`,
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });

    if (!session) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const stripeWebhook = async (req, res) => {
//   let event;
//   try {
//     const payloadString = JSON.stringify(req.body, null, 2);
//     const secret = process.env.WEBHOOK_ENDPOINT_SECRET;
//     const header = stripe.webhooks.generateTestHeaderString({
//       payload: payloadString,
//       secret,
//     });

//     event = stripe.webhooks.constructEvent(payloadString, header, secret);
//   } catch (error) {
//     console.log("Webhook error:", error.message);
//     return res.status(400).send(`Webhook error: ${error.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     try {
//       const session = event.data.object;

//       const purchase = await CoursePurchase.findOne({
//         paymentId: session.id,
//       }).populate({ path: "courseId" });

//       if (!purchase) {
//         return res.status(404).json({ message: "Purchase not found" });
//       }
//       if (session.amount_total) {
//         purchase.amount = session.amount_total / 100;
//       }

//       purchase.status = "completed";

//       if (purchase.courseId && purchase.courseId.lecture.lecture > 0) {
//         await Lecture.updateMany(
//           { _id: { $in: purchase.courseId.lecture } },
//           { $set: { isPreviewFree: true } }
//         );
//       }
//       await purchase.save();

//       await User.findByIdAndUpdate(
//         purchase.userId,
//         { $addToSet: { enrolledCourses: purchase.courseId._id } },
//         { new: true }
//       );
//       await Course.findByIdAndUpdate(
//         purchase.courseId._id,
//         { $addToSet: { enrolledStudents: purchase.userId } },
//         { new: true }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({
        path: "courseId",
      });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      purchase.status = "completed";
      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }

      // Make lectures previewable if required
      if (purchase.courseId && purchase.courseId.lecture.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lecture } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } },
        { new: true }
      );

      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );

      res.status(200).json({ received: true });
    } catch (error) {
      console.error("Stripe Webhook Handler Error:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(200).send("Unhandled event type");
  }
};

export const getCoursedeatilWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    if (!course) {
      return res.status(404).json({ message: "coursenot found" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchaseCourse = async(_,res)=>{
  try {
    const purchaseCourse = await CoursePurchase.find({status:"completed"}).populate("courseId");
    if(!purchaseCourse){
      return res.status(404).json({
        purchaseCourse:[]
      })
    }
    return res.status(200).json({
      purchaseCourse,
    })
  } catch (error) {
    console.log(error)
  }
}
