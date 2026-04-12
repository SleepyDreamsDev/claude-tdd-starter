import Link from "next/link";
import { Search, GitCompareArrows, CalendarCheck } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import {
  getFeaturedProviders,
  getServiceTypes,
  getNeighborhoods,
  getServiceTypesWithMinPrice,
} from "@/lib/mock-data";
import { ProviderCard } from "@/components/providers/provider-card";
import { SearchForm } from "@/components/home/search-form";
import { PopularServices } from "@/components/home/popular-services";

const HOW_IT_WORKS_ICONS = [Search, GitCompareArrows, CalendarCheck];

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const featured = getFeaturedProviders();
  const popularServices = getServiceTypesWithMinPrice();
  const serviceTypes = getServiceTypes().map((s) => ({
    value: s.value,
    label: s.label[locale],
  }));
  const neighborhoods = getNeighborhoods().map((n) => ({
    value: n.value,
    label: n.label[locale],
  }));

  const cardLabels = {
    verified: dict.providers.verified,
    per_sqm: dict.common.per_sqm,
    reviews: dict.common.reviews,
    rating_aria: dict.common.rating_aria,
  };

  const steps = [
    { title: dict.home.step1_title, desc: dict.home.step1_desc },
    { title: dict.home.step2_title, desc: dict.home.step2_desc },
    { title: dict.home.step3_title, desc: dict.home.step3_desc },
  ];

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Hero */}
      <section className="lg:flex">
        <div className="flex-1 px-5 pb-7 pt-6 lg:px-10 lg:pb-11 lg:pt-12">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-md bg-primary-light px-3 py-1 text-[11px] font-medium text-text-accent lg:mb-5">
            <span className="h-2 w-2 rounded-full bg-primary opacity-60" />
            Chișinău, Moldova
          </div>
          <h1 className="mb-2 font-heading text-[26px] font-normal leading-tight text-text-heading md:text-[36px] lg:mb-3">
            {dict.home.hero_title}
          </h1>
          <p className="mb-6 max-w-[400px] text-sm leading-relaxed text-text-secondary lg:mb-8 lg:text-base">
            {dict.home.hero_subtitle}
          </p>
          <SearchForm
            locale={locale}
            serviceTypes={serviceTypes}
            neighborhoods={neighborhoods}
            labels={{
              search_service: dict.home.search_service,
              search_area: dict.home.search_area,
              search_button: dict.home.search_button,
            }}
          />
        </div>

        {/* Desktop sidebar — mini provider listing */}
        <aside className="hidden w-[280px] border-l-[0.5px] border-border-light bg-bg-card px-6 py-8 lg:block">
          <div className="mb-4 text-[11px] uppercase tracking-[1.5px] text-text-secondary">
            {dict.home.featured_title}
          </div>
          <div className="flex flex-col gap-3.5">
            {featured.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                locale={locale}
                labels={cardLabels}
                variant="mini"
              />
            ))}
          </div>
          <Link
            href={`/${locale}/providers`}
            className="mt-4 block rounded-default border-[0.5px] border-border-default py-2 text-center text-xs text-primary"
          >
            {dict.home.featured_view_all}
          </Link>
        </aside>
      </section>

      {/* Featured providers — mobile/tablet only */}
      <section className="px-5 pb-6 lg:hidden">
        <div className="mb-3.5 flex items-baseline justify-between">
          <h2 className="font-heading text-[17px] text-text-heading">
            {dict.home.featured_title}
          </h2>
          <Link href={`/${locale}/providers`} className="text-xs text-primary">
            {dict.home.featured_view_all}
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          {featured.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              locale={locale}
              labels={cardLabels}
            />
          ))}
        </div>
      </section>

      {/* Popular services */}
      <PopularServices
        services={popularServices}
        labels={{
          title: dict.home.popular_services_title,
          starting_from: dict.home.starting_from,
        }}
        locale={locale}
      />

      {/* How it works */}
      <section id="how-it-works" className="px-5 pb-6 lg:px-10 lg:pb-8">
        <div className="rounded-xl border-[0.5px] border-border-default bg-bg-card p-4 lg:flex lg:items-center lg:gap-5 lg:rounded-none lg:border-x-0 lg:border-b-0 lg:border-t-[0.5px] lg:border-border-light lg:bg-transparent lg:p-6">
          <h2 className="mb-3 font-heading text-[15px] text-text-heading lg:hidden">
            {dict.home.how_it_works}
          </h2>
          {steps.map((step, i) => {
            const Icon = HOW_IT_WORKS_ICONS[i];
            return (
              <div
                key={i}
                className="mb-3 flex flex-1 items-center gap-2.5 last:mb-0 lg:mb-0"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light lg:h-10 lg:w-10">
                  <Icon
                    size={14}
                    strokeWidth={1.3}
                    className="text-primary lg:hidden"
                  />
                  <Icon
                    size={18}
                    strokeWidth={1.3}
                    className="hidden text-primary lg:block"
                  />
                </div>
                <div>
                  <span className="text-[13px] font-medium text-text-heading lg:text-sm">
                    {step.title}
                  </span>{" "}
                  <span className="text-[13px] text-text-secondary lg:block">
                    {step.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
