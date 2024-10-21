import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './database/database';
import userRoutes from './routes/user.routes';
import blogRoutes from './routes/blog.routes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

// Sync Sequelize models to create tables
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Chỉ tạo bảng nếu chưa tồn tại
    console.log('Database synced');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

syncDatabase();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});