import { sequelize } from './database/database';
import express from 'express';
import userRoutes from './routes/user.routes';
import blogRoutes from './routes/blog.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

// Sync Sequelize models to create tables
sequelize.sync({ force: false })  // Chỉ tạo bảng nếu chưa tồn tại
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
