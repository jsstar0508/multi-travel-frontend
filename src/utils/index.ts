

export const ImagePath = (url: string): string => {
  return process.env.NODE_ENV !== "production"

  ?`http://localhost:5000/static/images/avatar/${url}`
  : `/static/images/avatar/${url}`;

};