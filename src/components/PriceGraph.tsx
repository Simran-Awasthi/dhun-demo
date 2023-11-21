const PriceGraph = ({ data }: { data: { [key: string]: number } }) => {
  // A bar graph showing the price of each category
  const maxPrice = Math.max(...Object.values(data)); // Maximum price of all categories
  const minPrice = Math.min(...Object.values(data)); // Minimum price of all categories
  const calculateBarHeight = (price: number) => {
    const maxHeight = 200; // Maximum height of the bar
    const minHeight = 10; // Minimum height of the bar
    const priceRange = maxPrice - minPrice; // Range of prices from minimum to current price
    const heightRange = maxHeight - minHeight; // Range of heights from minimum to maximum

    // Calculate the height of the bar based on the price and the range
    const barHeight = minHeight + (price / priceRange) * heightRange;

    return barHeight;
  };

  // Render the bar graph
  return (
    <div className="w-full px-8 py-4">
      <div className="flex gap-4 justify-center w-full px-4 pt-4 items-end border-l-2 border-b-2 border-grayed relative">
        <span className="absolute top-0 -left-14 text-center text-heading font-bold font-poppins text-grayed">{`₹`}</span>
        {Object.keys(data).map((category, idx) => {
          return (
            <div
              key={`bar-${category}-${idx}`}
              className="w-full relative flex justify-center items-center">
              <div
                data-value={data[category]}
                style={{
                  height: calculateBarHeight(data[category]),
                }}
                className="bg-secondary w-8 rounded-t-md "></div>
              <span className="absolute -bottom-8 text-center w-full min-w-[40px] text-xs text-grayed">
                {category === "category_6" ? "Custom" : `Category ${idx}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceGraph;
