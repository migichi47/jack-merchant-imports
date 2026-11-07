import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-500 hover:text-pink-500 transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4 text-gray-400" />

              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="text-gray-500 hover:text-pink-500 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast ? "font-semibold text-gray-900" : "text-gray-500"
                  }
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
