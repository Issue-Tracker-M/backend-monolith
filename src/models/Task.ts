import mongoose from 'mongoose'

const Comment = new mongoose.Schema(
  {
    // id: mongoose.Types.ObjectId,
    content: String,
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
    },
    // attachments:[String],
  },
  { timestamps: true }
)

const Tasks = mongoose.model(
  'Tasks',
  new mongoose.Schema(
    {
      // id: mongoose.Types.ObjectId,
      title: String,
      description: String,
      due_date: Date,
      priority: String, // look into optional types i.e
      labels: [
        {
          name: String,
          color: String,
          id: mongoose.Types.ObjectId,
        },
      ], //reference to labels within this tasks workspace
      users: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'Users',
        },
      ],
      comments: [Comment],
      // attachments:[String],
    },
    { timestamps: true }
  )
)

export default Tasks
