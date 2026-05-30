'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Inbox } from 'lucide-react';
import { Pagination, PageSize } from '@/components/ui/Pagination';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import useCampaigns from '@/hooks/useCampaigns';

export default function CampaignsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(12);

  const { data, isLoading, isError } = useCampaigns(page, pageSize);
  const campaigns = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-white pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-[1280px]">
          <h1 className="text-4xl font-extrabold text-foreground mb-2">All Campaigns</h1>
          <p className="text-neutral-500">Browse active campaigns you can support.</p>
        </div>
      </div>

      <ProjectFilters />

      <main className="container mx-auto px-4 py-10 max-w-[1280px]">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-neutral-600">Total campaigns: <span className="font-semibold text-foreground">{total}</span></p>
          <div />
        </div>

        {isError && (
          <div className="py-12 text-center text-muted-foreground">Could not load campaigns. Please try again later.</div>
        )}

        {!isLoading && campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-neutral-300">
            <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6">
              <Inbox className="w-10 h-10 text-neutral-300" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">No campaigns found</h3>
            <p className="text-neutral-500 text-center max-w-sm mb-8">There are no active campaigns right now. Check back later or explore featured campaigns.</p>
            <Link href="/" className="px-5 py-2 rounded-lg border border-neutral-200 text-sm font-bold">Return Home</Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((c) => (
                <ProjectCard key={c.id} project={c as any} />
              ))}
            </div>

            <div className="mt-8">
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(s) => {
                  setPageSize(s);
                  setPage(1);
                }}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
