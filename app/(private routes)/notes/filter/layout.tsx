import css from './layout.module.css';

interface FilterLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
  children: React.ReactNode;
}

export default function FilterLayout({ sidebar, content, children }: FilterLayoutProps) {
  return (
    <div className={css.wrapper}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.content}>{content || children}</main>
    </div>
  );
}