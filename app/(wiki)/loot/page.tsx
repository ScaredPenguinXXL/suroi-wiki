import {
  LootTiers,
  LootTables,
} from "@/vendor/suroi/server/src/data/lootTables";
import { Loots } from "@/vendor/suroi/common/src/definitions/loots";
import LootCalc from "@/components/interactive/LootCalc";
import TableWithHeader from "@/components/tables/TableWithHeader";

export default function LootPage() {
  return (
    <div className="col-span-8 text-white">
      <div className="prose ">
        <h1>Loot Tables</h1>
        <p>
          Loot Tables are lists of items that determine the possible drops from
          features around the map. Loot tables also define the chances of
          various items to drop.
        </p>
        <h2>Loot Tiers</h2>
        <p>
          Loot tables are divided into certain common loot tiers. These loot
          tiers are reused throughout many different tables.
        </p>
      </div>
      <div>
        {Object.entries(LootTiers).map(([name, tiers]) => (
          <div key={name} id={name}>
            <TableWithHeader
              key={name}
              title={`Tier ${name}`}
              header={["Item", "Weight", "% Chance"]}
              content={tiers.map((tier) => [
                Loots.definitions.find((item) => item.idString === tier.item)
                  ?.name ?? tier.item,
                tier.weight,
                (
                  (tier.weight /
                    tiers.reduce((acc, tier) => acc + tier.weight, 0)) *
                  100
                ).toFixed(2) + "%",
              ])}
            />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="prose ">
          <h2>Loot Tables</h2>
          <p>
            These tables determine which loot tiers to use for a given obstacle.
          </p>
        </div>
      </div>
      {Object.entries(LootTables).map(([name, tables]) => (
        <div key={name} id={name}>
          <TableWithHeader
            title={`Table ${name}`}
            header={["Tier/Item", "Weight", "% Chance"]}
            content={tables.loot
              .flat()
              .map((tier) => [
                `Tier ${tier.tier}`,
                tier.weight.toString(),

                (
                  (tier.weight /
                    tables.loot
                      .flat()
                      .reduce((acc, tier) => acc + tier.weight, 0)) *
                  100
                ).toFixed(2) + "%",
              ])}
          />
        </div>
      ))}
      <div className="mt-8">
        <div className="prose " id="calc">
          <h2>Calculator</h2>
          <p>
            Use this interactive calculator to determine the chance of an item
            dropping from an obstacle.
          </p>
        </div>
        <LootCalc />
      </div>
    </div>
  );
}
