Feature: Step 4 — Layout components
  As a visitor to Forever Clean
  I want consistent navigation and layout structure on every page
  So that I can navigate the app in my preferred language

  # ── Header ──────────────────────────────────────────────────────────────

  Scenario: Header renders logo
    Given the Header component is rendered
    Then I see the brand text "Forever Clean"

  Scenario: Header renders locale switcher
    Given the Header component is rendered with locale "ro"
    Then I see "RO" and "RU" locale options

  Scenario: Hamburger button is present with correct aria-expanded state
    Given the Header component is rendered
    Then the hamburger button exists with aria-expanded="false"

  Scenario: Mobile menu opens when hamburger is clicked
    Given the Header component is rendered
    When I click the hamburger button
    Then aria-expanded on the hamburger button becomes "true"

  # ── Footer ───────────────────────────────────────────────────────────────

  Scenario: Footer renders nav links from labels
    Given the Footer component is rendered
    Then I see a link with the home label
    And I see a link with the providers label

  Scenario: Footer renders copyright and contact text
    Given the Footer component is rendered
    Then I see copyright text
    And I see contact text

  Scenario: Footer renders locale switcher
    Given the Footer component is rendered
    Then I see "RO" and "RU" locale options

  # ── Mobile navigation ────────────────────────────────────────────────────

  Scenario: Mobile nav renders 4 tab items
    Given the MobileNav component is rendered
    Then I see 4 navigation links with labels Home, Search, Bookings, Account

  Scenario: Active tab reflects current pathname
    Given the pathname is "/ro" (home)
    When the MobileNav component is rendered
    Then the Home link has aria-current="page"

  # ── Breadcrumbs ──────────────────────────────────────────────────────────

  Scenario: Breadcrumbs renders home link as first item
    Given the pathname is "/ro/providers"
    When Breadcrumbs is rendered
    Then the first link points to "/ro"

  Scenario: Breadcrumbs skips the locale segment
    Given the pathname is "/ro/providers"
    When Breadcrumbs is rendered
    Then I see a "Providers" breadcrumb label

  Scenario: Breadcrumbs humanizes hyphenated segments
    Given the pathname is "/ro/providers/diamond-cleaning"
    When Breadcrumbs is rendered
    Then I see "Diamond cleaning" as the last breadcrumb label

  Scenario: Breadcrumbs renders nothing on the home page
    Given the pathname is "/ro"
    When Breadcrumbs is rendered
    Then nothing is rendered
