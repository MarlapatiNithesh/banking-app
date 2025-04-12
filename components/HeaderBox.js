const HeaderBox = ({ type = "title", title, user = {}, subtext }) => {
  const formatName = (name = "") =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && user.firstName && user.lastName && (
          <span className="text-bankGradient">
            {" "}
            {formatName(user.firstName)} {formatName(user.lastName)}
          </span>
        )}
      </h1>

      {subtext && <p className="header-box-subtext">{subtext}</p>}
    </div>
  );
};

export default HeaderBox;
