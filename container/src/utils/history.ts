import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const useCustomNavigate = () => {
  return (path: string) => {
    history.push(path);
  };
}; 