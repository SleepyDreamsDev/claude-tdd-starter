Feature: Homepage
  As a visitor in Chișinău
  I want to see a professional landing page with search, featured providers, and how-it-works
  So that I can quickly find and book a cleaning service

  # --- StarRating component ---

  Scenario: Star rating renders correct filled stars for high rating
    Given a rating of 4.8
    When the StarRating component renders
    Then 5 stars are filled and 0 are empty

  Scenario: Star rating renders correct filled stars for medium rating
    Given a rating of 3.2
    When the StarRating component renders
    Then 3 stars are filled and 2 are empty

  Scenario: Star rating displays numeric score
    Given a rating of 4.8
    When the StarRating component renders
    Then the text "4.8" is visible

  Scenario: Star rating displays review count with label
    Given a rating of 4.8 with 47 reviews and countLabel "recenzii"
    When the StarRating component renders
    Then the text "(47 recenzii)" is visible

  Scenario: Star rating hides count when showCount is false
    Given a rating of 4.8 with showCount false
    When the StarRating component renders
    Then no review count text is shown

  Scenario: Star rating has accessible aria-label
    Given a rating of 4.8
    When the StarRating component renders
    Then the container has aria-label "4.8 din 5"

  # --- ProviderCard component ---

  Scenario: Provider card renders company name
    Given a provider "Diamond Cleaning"
    When the ProviderCard renders in list variant
    Then "Diamond Cleaning" is visible

  Scenario: Provider card renders price with unit
    Given a provider with pricePerSqm 55
    When the ProviderCard renders with per_sqm label "lei/m²"
    Then "55" and "lei/m²" are visible

  Scenario: Provider card renders star rating
    Given a provider with rating 4.9 and 85 reviews
    When the ProviderCard renders
    Then the StarRating shows "4.9" and "(85 recenzii)"

  Scenario: Provider card shows verified badge when verified
    Given a verified provider
    When the ProviderCard renders with verified label "Verificat"
    Then the "Verificat" badge is visible

  Scenario: Provider card hides verified badge when not verified
    Given a non-verified provider
    When the ProviderCard renders
    Then no verified badge is shown

  Scenario: Provider card renders service tags with overflow
    Given a provider with 8 services
    When the ProviderCard renders in list variant
    Then 2 service tags are visible plus a "+6" overflow indicator

  Scenario: Provider card renders avatar with initials
    Given a provider "Diamond Cleaning"
    When the ProviderCard renders
    Then the avatar shows initials "DC"

  Scenario: Provider card links to provider profile
    Given a provider with slug "diamond-cleaning" and locale "ro"
    When the ProviderCard renders
    Then it links to "/ro/providers/diamond-cleaning"

  Scenario: Provider card mini variant renders compact layout
    Given a provider "Diamond Cleaning"
    When the ProviderCard renders in mini variant
    Then the avatar is smaller and no service tags are shown

  # --- SearchForm component ---

  Scenario: Search form renders service type select with placeholder
    Given labels with search_service "Tip de serviciu"
    When the SearchForm renders
    Then a select with placeholder "Tip de serviciu" is visible

  Scenario: Search form renders neighborhood select with placeholder
    Given labels with search_area "Cartier"
    When the SearchForm renders
    Then a select with placeholder "Cartier" is visible

  Scenario: Search form renders search button
    Given labels with search_button "Caută specialiști"
    When the SearchForm renders
    Then a button "Caută specialiști" is visible

  Scenario: Search form navigates with no selections
    Given no service or area selected
    When the user clicks the search button
    Then the app navigates to "/ro/providers"

  Scenario: Search form navigates with service selected
    Given service "GENERAL_CLEANING" is selected
    When the user clicks the search button
    Then the app navigates to "/ro/providers?service=GENERAL_CLEANING"

  Scenario: Search form navigates with both selected
    Given service "GENERAL_CLEANING" and area "centru" are selected
    When the user clicks the search button
    Then the app navigates to "/ro/providers?service=GENERAL_CLEANING&area=centru"

  # --- Homepage assembly ---

  Scenario: Homepage renders hero title in Romanian
    Given locale is "ro"
    When the homepage renders
    Then the hero title "Curățenie profesională în Chișinău" is visible

  Scenario: Homepage renders hero subtitle
    Given locale is "ro"
    When the homepage renders
    Then the subtitle text is visible

  Scenario: Homepage renders location badge
    When the homepage renders
    Then "Chișinău, Moldova" badge is visible

  Scenario: Homepage renders how-it-works section with 3 steps
    Given locale is "ro"
    When the homepage renders
    Then step titles "Caută", "Compară", "Rezervă" are visible

  Scenario: Homepage renders featured providers section title
    Given locale is "ro"
    When the homepage renders
    Then "Specialiști de top" section title is visible

  Scenario: Homepage renders 4 featured provider cards
    When the homepage renders
    Then 4 provider cards are visible with names from mock data

  Scenario: Homepage renders view-all link to providers
    Given locale is "ro"
    When the homepage renders
    Then a link "Vezi toți" pointing to "/ro/providers" is visible

  # --- Utility functions ---

  Scenario: getInitials extracts initials from company name
    Given the name "Diamond Cleaning"
    When getInitials is called
    Then the result is "DC"

  Scenario: getInitials handles single-word names
    Given the name "ProCurat"
    When getInitials is called
    Then the result is "P"

  Scenario: getAvatarColor returns deterministic colors
    Given the name "Diamond Cleaning"
    When getAvatarColor is called twice
    Then both calls return the same bg and text values
