interface SeatSVGProps {
  className?: string;
}

const SeatSVG: React.FC<SeatSVGProps> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='24'
      height='24'
    >
      {/* SVG content */}
    </svg>
  );
};

export default SeatSVG;
