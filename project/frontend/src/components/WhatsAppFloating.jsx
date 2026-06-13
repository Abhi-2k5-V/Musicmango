import React from 'react';

export default function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/919846495782"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse effect rings */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75 group-hover:hidden" style={{ animationDuration: '2s' }} />
      
      {/* WhatsApp SVG Icon */}
      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-white" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.49-14.754c-.116-.258-.238-.264-.35-.269-.091-.004-.196-.004-.3-.004-.106 0-.277.04-.423.197-.145.158-.556.543-.556 1.324 0 .781.568 1.538.647 1.646.08.108 1.116 1.704 2.705 2.392.396.172.706.274.947.35.398.127.761.109 1.048.066.32-.048.987-.404 1.127-.793.139-.39.139-.724.097-.794-.042-.07-.154-.108-.321-.192-.167-.084-.987-.487-1.14-.543-.153-.056-.264-.084-.376.084-.111.167-.43.543-.527.655-.098.112-.195.126-.362.042-.167-.084-.705-.26-1.344-.83-.497-.443-.833-.991-.93-1.159-.098-.168-.01-.259.073-.343.076-.076.167-.195.25-.293.084-.098.112-.167.168-.278.056-.111.028-.209-.014-.293-.042-.084-.376-.906-.516-1.245z"/>
      </svg>
      
      {/* Hover Tooltip/Label */}
      <span className="absolute right-16 bg-gray-900 text-white text-[10px] font-bold px-3 py-2 rounded-lg shadow-xl opacity-0 translate-x-3 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap border border-white/10 uppercase tracking-widest">
        Chat on WhatsApp
      </span>
    </a>
  );
}
