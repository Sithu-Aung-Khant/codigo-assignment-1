import { Bike, Dumbbell, Heart, Medal, Trophy, Users } from 'lucide-react';

type IconComponent = typeof Bike;

const sportsIcons: IconComponent[] = [
  Dumbbell,
  Bike,
  Users,
  Heart,
  Trophy,
  Medal,
];

type FloatingIconsProps = {
  rotateLeft: boolean;
  revertRotation: boolean;
};

export const FloatingIcons = ({
  rotateLeft,
  revertRotation,
}: FloatingIconsProps) => {
  return (
    <div className='absolute inset-0 w-full h-full overflow-hidden pointer-events-none'>
      {rotateLeft &&
        revertRotation &&
        [...Array(12)].map((_, i) => {
          const randomY = (i * 19) % 80;
          const speed = 15 + ((i * 13) % 10);

          const Icon = sportsIcons[i % sportsIcons.length];
          const size = 40 + ((i * 11) % 24);
          const rotationSpeed = 3 + ((i * 7) % 5);

          return (
            <div
              key={`icon-${i}`}
              className='absolute transition-opacity duration-1000 ease-in-out opacity-100'
              style={{
                top: `${randomY}%`,
                right: `${-20}%`,
                animation: `float-icon ${speed}s linear infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <div
                className='text-red-500/40'
                style={{
                  animation: `spin ${rotationSpeed}s linear infinite`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              >
                <Icon size={size} />
              </div>
            </div>
          );
        })}
    </div>
  );
};
