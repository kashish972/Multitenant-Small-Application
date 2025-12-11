// components/ui/table.tsx
import * as React from "react";

export const Table = ({ className, children }: React.HTMLAttributes<HTMLTableElement>) => (
  <table className={className}>{children}</table>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => <thead>{children}</thead>;

export const TableBody = ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>;

export const TableRow = ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>;

export const TableHead = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <th className={`px-4 py-2 text-left ${className}`}>{children}</th>
);

export const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-2 ${className}`}>{children}</td>
);
