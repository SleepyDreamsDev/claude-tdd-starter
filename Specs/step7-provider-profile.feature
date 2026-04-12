Feature: Provider profile page
  As a client evaluating a specific provider
  I want to see their full profile, photos, services, and reviews
  So that I can decide whether to book them

  Scenario: Profile renders company name, rating and verified badge
    Given a verified provider with rating 4.9 and 85 reviews
    When I visit the provider profile page in locale "ro"
    Then I see the company name as a heading
    And I see the star rating with score "4.9" and "(85 recenzii)"
    And I see a "Verificat" badge

  Scenario: Profile renders bio in the correct locale
    Given a provider with different RO and RU bios
    When I visit the profile in locale "ro"
    Then I see the Romanian bio text
    When I visit the profile in locale "ru"
    Then I see the Russian bio text

  Scenario: Profile renders services list
    Given a provider offering GENERAL_CLEANING and DEEP_CLEANING
    When I visit the provider profile in locale "ro"
    Then I see "Curățenie generală" in the services section
    And I see "Curățenie profundă" in the services section
    And each service shows the price per m²

  Scenario: Profile renders coverage area badges
    Given a provider serving "centru" and "botanica"
    When I visit the provider profile in locale "ro"
    Then I see "Centru" and "Botanica" as neighborhood badges

  Scenario: Profile renders availability schedule
    Given a provider with Monday 08:00–19:00 availability
    When I visit the provider profile
    Then I see a row showing "Lun" and "08:00 – 19:00"

  Scenario: Profile renders reviews sorted newest first
    Given a provider with two reviews on different dates
    When I visit the provider profile
    Then reviews are shown in reverse chronological order (newest first)
    And each review shows client name, star rating, comment, and date

  Scenario: ReviewCard renders correctly
    Given a review with client "Maria T.", rating 5, and a comment
    When I render the ReviewCard component
    Then I see the client initials "MT" in an avatar circle
    And I see 5 filled stars
    And I see the comment text

  Scenario: CTA bar links to the booking page
    Given provider with slug "diamond-cleaning"
    When I visit the profile in locale "ro"
    Then the CTA button links to "/ro/booking/diamond-cleaning"
    And the CTA shows the price per m²

  Scenario: Profile returns 404 for unknown slug
    Given no provider exists with slug "nonexistent-company"
    When I visit "/ro/providers/nonexistent-company"
    Then Next.js notFound() is called

  Scenario: Profile page generates correct metadata
    Given a provider with companyName "Diamond Cleaning"
    When generateMetadata is called
    Then the title includes "Diamond Cleaning"
    And the description is derived from the provider bio
