import React from "react";
import Range from "../Range/Range";

const labels = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];

const Stats = ({ stats }) => {
  const total = stats.reduce(
    (sum, current) => sum + parseInt(current.base_stat),
    0
  );
  return (
    <div className="tab tab-base-stats">
      <table>
        <tbody>
          {labels.map((label, i) => (
            <tr key={label}>
              <td>{label}</td>
              <td>
                {stats[i].base_stat}
                <Range value={stats[i].base_stat} />
              </td>
            </tr>
          ))}

          <tr>
            <td>Total</td>
            <td>
              {total}
              <Range value={total} max="600" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
