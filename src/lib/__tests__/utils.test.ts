import { getInitials, getAvatarColor } from "@/lib/utils";

describe("getInitials", () => {
  it("extracts initials from two-word company name", () => {
    expect(getInitials("Diamond Cleaning")).toBe("DC");
  });

  it("extracts single initial from one-word name", () => {
    expect(getInitials("ProCurat")).toBe("P");
  });

  it("limits to 2 characters for long names", () => {
    expect(getInitials("EcoClean Moldova Express")).toBe("EM");
  });

  it("handles extra whitespace", () => {
    expect(getInitials("  Casa   Curata  ")).toBe("CC");
  });
});

describe("getAvatarColor", () => {
  it("returns deterministic colors for the same name", () => {
    const first = getAvatarColor("Diamond Cleaning");
    const second = getAvatarColor("Diamond Cleaning");
    expect(first.bg).toBe(second.bg);
    expect(first.text).toBe(second.text);
  });

  it("returns an object with bg and text Tailwind classes", () => {
    const color = getAvatarColor("ProCurat");
    expect(color.bg).toMatch(/^bg-/);
    expect(color.text).toMatch(/^text-/);
  });

  it("returns different colors for different names", () => {
    const a = getAvatarColor("Diamond Cleaning");
    const b = getAvatarColor("ProCurat");
    // Not guaranteed but very likely with a good hash
    expect(a.bg !== b.bg || a.text !== b.text).toBe(true);
  });
});
