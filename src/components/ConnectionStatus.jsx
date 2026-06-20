export default function ConnectionStatus({ isConnected }) {
  return (
    <div
      className={`fixed top-4 right-4 px-6 py-3 rounded-lg font-bold flex items-center gap-3 z-50 ${
        isConnected
          ? 'bg-green-500 text-white'
          : 'bg-red-600 text-white animate-pulse'
      }`}
    >
      <span
        className={`w-3 h-3 rounded-full ${
          isConnected ? 'bg-white' : 'bg-yellow-300'
        }`}
      ></span>
      {isConnected ? '🟢 Connected' : '🔴 Connection Lost'}
    </div>
  );
}
