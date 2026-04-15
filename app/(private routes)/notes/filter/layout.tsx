import css from './layout.module.css';

interface FilterLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function FilterLayout({ sidebar, children }: FilterLayoutProps) {
  return (
    <div className={css.wrapper}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.content}>{children}</main>
    </div>
  );
}
