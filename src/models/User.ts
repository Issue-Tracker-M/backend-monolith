import mongoose from 'mongoose';

const User = mongoose.model(
  'Users',
  new mongoose.Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      username: { type: String, required: true },
      password: { type: String, required: true },
      email: { type: String, required: true, unique: true, trim: true },
      workspaces: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'Workspaces',
        },
      ],
      // identities: look into OAuth and how exactly user is delineated
    },
    { timestamps: true }
  )
);

export default User;
