const Button = ({ children, className, ...props }) => {
    return (
      <button
        className={`px-4 py-2 rounded-md font-semibold focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export { Button };
  
