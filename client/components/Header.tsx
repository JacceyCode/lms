const Header = ({ title, subtitle, rightElement }: HeaderProps) => {
  return (
    <section className="header">
      <section>
        <h1 className="header__title">{title}</h1>
        <p className="heaedr__subtitle">{subtitle}</p>
      </section>
      {rightElement && <section>{rightElement}</section>}
    </section>
  );
};

export default Header;
