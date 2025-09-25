function Cards({ cards }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
      {cards.map((card) => (
        <div 
          key={card.id} 
          className="bg-richblack-800 text-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300"
        >
          <img 
            src={card.image} 
            alt={card.name} 
            className="w-full h-32 object-cover rounded-lg"
          />
          <h3 className="text-xl font-bold mt-4">{card.name}</h3>
          <p className="text-sm text-richblack-300 mt-2 text-center">
            {card.description}
          </p>
          <a 
            href={card.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-yellow-400 text-richblack-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Visit Website
          </a>
        </div>
      ))}
    </div>
  );
}

export default Cards;
