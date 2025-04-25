import { useDownload } from "./hooks/useDolnload";
interface IProps {
  hasMore: boolean;
  loadMore: () => Promise<unknown>;
}
export default ({ hasMore, loadMore }: IProps) => {
  const { tips } = useDownload({ hasMore, loadMore });
  return <div>{hasMore ? tips : "没有更多数据了"}</div>;
};
