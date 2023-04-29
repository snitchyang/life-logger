interface Content {
  content: string;
}

export const Content = ({ content }: Content) => {
  return <p className={"content"}>{content}</p>;
};
