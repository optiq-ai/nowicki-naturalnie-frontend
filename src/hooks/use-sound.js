// Custom hook for playing sounds in the application
export const useSound = () => {
  const playSound = (soundName, volume = 0.3) => {
    try {
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.volume = volume; // Set volume to 30% by default for subtlety
      audio.play().catch(error => {
        // Silently handle autoplay restrictions
        console.log('Sound playback was prevented:', error);
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const playPigGrunt = () => {
    // Lower volume for pig grunt to make it more subtle
    playSound('pig_grunt', 0.2);
  };

  const playButtonClick = () => {
    // Very subtle click sound
    playSound('button_click', 0.1);
  };

  return {
    playPigGrunt,
    playButtonClick,
    playSound
  };
};

export default useSound;
