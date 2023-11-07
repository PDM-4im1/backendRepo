export default function myMiddleware(req, res, next) {
    // Perform some task, such as logging or authentication
    next();
  }
  
  