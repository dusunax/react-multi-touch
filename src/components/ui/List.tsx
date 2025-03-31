const List = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ul className={`flex flex-col gap-3 my-4 ${className}`}>{children}</ul>
  );
};

const ListItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <li className={`list-disc ml-8 ${className}`}>{children}</li>;
};

List.Item = ListItem;

export default List;
