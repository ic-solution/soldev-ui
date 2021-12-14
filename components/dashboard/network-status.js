import { memo } from "react";
import Link from "next/link";

function NetworkStatus() {
  return (
    <section>
      <div className="p-6 space-y-4">
        <div>
          <h2
            id="who-to-follow-heading"
            className="text-base font-medium text-gray-900 "
          >
            Mainnet Beta
          </h2>
          <Link href="/network">
            <div className="mt-3 bg-green-400 h-10 flex justify-center items-center rounded-lg shadow cursor-pointer">
              <span className="">All Systems Operational</span>
            </div>
          </Link>
        </div>
        <div>
          <h2
            id="who-to-follow-heading"
            className="text-base font-medium text-gray-900 "
          >
            Devnet
          </h2>
          <Link href="/network">
            <div className="mt-3 bg-green-400 h-10 flex justify-center items-center rounded-lg shadow">
              <span className="">All Systems Operational</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(NetworkStatus);
