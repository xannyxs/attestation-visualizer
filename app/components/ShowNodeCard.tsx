interface NodeInfoCardProps {
  node: { id: string };
  onClose: () => void;
}

// TODO: <Button> should be an icon
//
// Keep the z-10, otherwise the card will get behind the graph

export default function ShowNodeCard({ node, onClose }: NodeInfoCardProps) {
  return (
    <div className="fixed right-0 top-3 bottom-3 w-1/4 bg-white z-10 rounded h-full">
      <button className="p-4 text-red-500" onClick={onClose}>
        X
      </button>
      <a href={`https://etherscan.io/address/${node.id}`}><p className="text-lg p-4">{node.id}</p></a>
      {/* Add more information here */}
    </div>
  );
}
