import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import HeroSection from "../../src/components/HeroSection.vue";

function makeTenant() {
  return {
    coupleNames: "A & B",
    dateISO: "2026-08-01",
    hero: {
      tagline: "Tagline",
      ctaPrimaryText: "RSVP",
      ctaSecondaryText: "Ubicaciones",
      ctaPrimaryTarget: "#rsvp",
      ctaSecondaryTarget: "#ubicaciones"
    },
    ceremony: { name: "Ceremonia", time: "17:00", address: "Dir", mapUrl: "" },
    reception: { name: "Recepcion", time: "19:00", address: "Dir", mapUrl: "" },
    schedule: [],
    dressCode: { title: "Formal", description: "" },
    gifts: { message: "" },
    rsvp: { mode: "whatsapp", enabled: true, deadlineISO: "2026-08-20", whatsappNumber: "5215512341111" },
    gallery: [],
    theme: {
      primary: "#000000",
      secondary: "#000000",
      background: "#ffffff",
      text: "#111111",
      fontHeading: "Boska",
      fontSubheading: "Boska",
      fontBody: "Inter"
    },
    seo: { title: "t", description: "d", url: "u", ogImage: "/og-default.svg" },
    story: { title: "", message: "" },
    faq: [],
    contactEmail: ""
  } as any;
}

describe("HeroSection buttons behavior", () => {
  it("hides buttons when heroConfig.buttons is explicitly empty", () => {
    const wrapper = mount(HeroSection, {
      props: {
        tenant: makeTenant(),
        heroConfig: { backgroundMode: "default", buttons: [] }
      }
    });
    expect(wrapper.findAll("a").length).toBe(0);
  });

  it("shows fallback CTAs when heroConfig is not provided", () => {
    const wrapper = mount(HeroSection, {
      props: {
        tenant: makeTenant()
      }
    });
    const links = wrapper.findAll("a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    expect(wrapper.text()).toContain("RSVP");
    expect(wrapper.text()).toContain("Ubicaciones");
  });
});

