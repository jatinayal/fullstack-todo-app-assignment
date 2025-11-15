import mongoose, {Schema} from 'mongoose';


const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
      default: ''
    },
    completed: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    }
  },
  {
    timestamps: true 
  }
);


todoSchema.index({ userId: 1, createdAt: -1 });


const Todo = mongoose.model('Todo', todoSchema);
export default Todo;