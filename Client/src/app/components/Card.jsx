export default function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white rounded-[12px] border border-[#E5E7EB] shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
