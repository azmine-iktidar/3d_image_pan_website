const ReSizeMessage = () => {
  return (
    <div className="absolute left-0 top-0 z-[1000] flex h-[100dvh] w-full items-center justify-center rounded-md border border-gray-100 bg-white bg-opacity-10 bg-clip-padding text-center text-white backdrop-blur-3xl backdrop-filter">
      <p>Please resize your window to see the 3D model in full screen.</p>
    </div>
  );
};

export default ReSizeMessage;
