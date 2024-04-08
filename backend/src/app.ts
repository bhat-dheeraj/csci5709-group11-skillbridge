import { connectToDatabase } from "./utils/config";
import contentFeedRouter from "./routes/contentFeed";
import express from "express";
import cors from "cors";
import middleware from "./utils/middleware";
import mentorRouter from "./routes/mentor";
import userRouter from "./routes/userDetails";
import discussionRouter from "./routes/discussion";
import paymentsRouter from "./routes/payments";
import bookingRouter from "./routes/booking";
import jobRouter from "./routes/job";
import messageRouter from "./routes/message";
import bodyParser from "body-parser";
import { app, server } from "./socket/socket";


connectToDatabase();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(middleware.morganMiddleWare);

app.use("/user", userRouter);
app.use("/contentfeed", contentFeedRouter);
app.use("/mentor", mentorRouter);
app.use("/userDetails/", userRouter);
app.use("/discussions", discussionRouter);
app.use("/payments", paymentsRouter);
app.use("/job", jobRouter);
app.use("/bookings", bookingRouter);
app.use("/message", messageRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export {app, server};
