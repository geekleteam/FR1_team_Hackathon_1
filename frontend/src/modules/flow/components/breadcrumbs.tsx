import { Breadcrumb as BreadcrumbBase, BreadcrumbItem } from 'flowbite-react';

export function Breadcrumbs() {
  return (
    <div>
      <img src="/logo.png" className="h-12 w-auto" alt="Logo" />
      <BreadcrumbBase>
        <BreadcrumbItem key="/" href="#">
          Tentacle
        </BreadcrumbItem>
        <BreadcrumbItem key="/level-1" href="#">
          E-Commerce Platform
        </BreadcrumbItem>
        <BreadcrumbItem key="/level-1/level-2" href="#">
          Architecture
        </BreadcrumbItem>
      </BreadcrumbBase>

      {/* Current Diagram View/Type/Name */}
      {/* <div className="text-xl font-medium text-gray-900 dark:text-gray-300 mt-2">Overview</div> */}
    </div>
  );
}
