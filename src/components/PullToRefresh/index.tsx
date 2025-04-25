import { AutoCenter } from 'antd-mobile';
import { STATUS, TIPS, usePullToRefresh } from './hooks/useRullToRefresh';

interface IProps {
  children: React.ReactNode;
  onRefresh: () => void;
}

/**
* 下拉刷新组件
* 仅供学习使用
*/
const PullToRefresh = ({
  children,
  onRefresh,
}: IProps) => {
  const { status, containerRef } = usePullToRefresh(onRefresh);
  return (
    <div ref={containerRef}>
      {status !== STATUS.FINISH && <AutoCenter>{TIPS[status]}</AutoCenter>}
      {children}
    </div>
  );
};

export default PullToRefresh;

