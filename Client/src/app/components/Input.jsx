export default function Input({ 
  label, 
  error,
  className = '', 
  ...props 
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[14px] font-medium text-[#111827]">
          {label}
        </label>
      )}
      <input
        className={`
          w-full 
          px-4 
          py-2 
          bg-white 
          border 
          border-[#E5E7EB] 
          rounded-[8px] 
          text-[16px]
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#2563EB] 
          focus:border-transparent
          disabled:bg-[#F8FAFC]
          disabled:cursor-not-allowed
          ${error ? 'border-[#EF4444] focus:ring-[#EF4444]' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-[14px] text-[#EF4444]">{error}</p>
      )}
    </div>
  );
}
