export const dbConfig = {
  // db: 'mongodb://localhost:tutor/tutor',
  db: 'mongodb://127.0.0.1:Covid_Data/Covid_Data',
  secret: '123456'
}
export const emailConfig = exports.emailConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: "your@gmail.com",
      pass: "yourpasword"
  }
};

export const ROOT_URL = exports.ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://test.com:3000' : 'http://localhost:3000';