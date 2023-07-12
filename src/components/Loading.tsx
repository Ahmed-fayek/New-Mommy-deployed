import "./Loading.css";
function Loading() {
  return (
    <div id="wrap">
      <div className="baby">
        <div className="face">
          <div className="eyes"></div>
          <div className="mouth">
            <div className="tongue"></div>
          </div>
        </div>
        <div className="blanket"></div>
      </div>

      <div className="milk_bottle">
        <div className="tube_top"></div>
        <div className="tube_middle"></div>
        <div className="tube_bottom"></div>
        <div className="bottle"></div>
      </div>

      <div className="pacifier">
        <div className="pacifier_top"></div>
        <div className="pacifier_middle"></div>
        <div className="pacifier_bottom"></div>
      </div>

      <div className="pacifier shadow">
        <div className="pacifier_top"></div>
        <div className="pacifier_middle"></div>
        <div className="pacifier_bottom"></div>
      </div>
    </div>
  );
}
export default Loading;
