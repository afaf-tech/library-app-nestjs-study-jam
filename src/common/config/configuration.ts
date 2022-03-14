export default () => ({
  port: +process.env.APP_PORT,
  jwtSecret: process.env.JWT_SECRET,
});
