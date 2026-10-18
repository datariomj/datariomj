import { ComponentFixture, TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DeploymentArchitectureComponent, NodeDetail } from "./deployment-architecture.component";

describe("DeploymentArchitectureComponent", () => {
  let component: DeploymentArchitectureComponent;
  let fixture: ComponentFixture<DeploymentArchitectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeploymentArchitectureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeploymentArchitectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create component with default null node state", () => {
    expect(component).toBeTruthy();
    expect(component.selectedNodeId).toBeNull();
    expect(component.currentNode).toBeNull();
  });

  it("should contain 22 detailed architecture nodes", () => {
    const keys = Object.keys(component.nodeDetails);
    expect(keys.length).toBe(22);
    expect(keys).toContain("datariomj");
    expect(keys).toContain("datariomj-infra");
    expect(keys).toContain("datariomj-sentry");
    expect(keys).toContain("datariomj-azdo");
    expect(keys).toContain("datariomj-azp-agent");
    expect(keys).toContain("acm");
    expect(keys).toContain("route53");
    expect(keys).toContain("cloudfront");
    expect(keys).toContain("s3");
    expect(keys).toContain("prod");
    expect(keys).toContain("staging");
  });

  it("should select node and update currentNode getter", () => {
    component.selectNode("datariomj-sentry");
    expect(component.selectedNodeId).toBe("datariomj-sentry");

    const current: NodeDetail | null = component.currentNode;
    expect(current).not.toBeNull();
    expect(current?.title).toBe("datariomj-sentry");
    expect(current?.visibility).toBe("PRIVATE");
  });

  it("should cover all node selections and keyboard events", () => {
    const nodeIds = Object.keys(component.nodeDetails);
    nodeIds.forEach((id) => {
      if (id !== "prod" && id !== "staging") {
        component.selectNode(id);
        expect(component.selectedNodeId).toBe(id);
        expect(component.currentNode).not.toBeNull();
      }
    });

    const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
    const spaceEvent = new KeyboardEvent("keydown", { key: " " });
    const otherEvent = new KeyboardEvent("keydown", { key: "Escape" });

    component.handleKeydown(enterEvent, "lint");
    expect(component.selectedNodeId).toBe("lint");

    component.handleKeydown(spaceEvent, "build");
    expect(component.selectedNodeId).toBe("build");

    component.handleKeydown(otherEvent, "test");
    expect(component.selectedNodeId).toBe("build");
  });

  it("should execute all template event listeners in both diagram map and detail panel states", () => {
    const spyWindow = vi.spyOn(window, "open").mockImplementation(() => null);

    // 1. Diagram Map State (currentNode === null)
    component.closeDetail();
    fixture.detectChanges();
    let compiled = fixture.nativeElement as HTMLElement;

    const mapInteractive = compiled.querySelectorAll("[role='button'], button, a");
    mapInteractive.forEach((el) => {
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      el.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
      component.closeDetail();
      fixture.detectChanges();
    });

    // 2. Detail Panel Overlay State (currentNode !== null)
    component.selectNode("datariomj");
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;

    const detailInteractive = compiled.querySelectorAll("button, a, [role='button']");
    detailInteractive.forEach((el) => {
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      el.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
      fixture.detectChanges();
    });

    expect(spyWindow).toHaveBeenCalled();
    spyWindow.mockRestore();
  });

  it("should render details panel overlay with PUBLIC, PRIVATE, and INTERNAL visibility states", () => {
    component.selectNode("datariomj");
    fixture.detectChanges();
    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain("PUBLIC");

    component.selectNode("datariomj-infra");
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain("PRIVATE");

    component.selectNode("agent");
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain("INTERNAL STAGE");
  });

  it("should open external tabs for prod and staging endpoints", () => {
    const spyWindow = vi.spyOn(window, "open").mockImplementation(() => null);

    component.selectNode("prod");
    expect(spyWindow).toHaveBeenCalledWith("https://datariomj.dev", "_blank");

    component.selectNode("staging");
    expect(spyWindow).toHaveBeenCalledWith("https://staging.datariomj.dev", "_blank");

    spyWindow.mockRestore();
  });

  it("should close detail panel when closeDetail is invoked", () => {
    component.selectNode("datariomj-infra");
    expect(component.currentNode).not.toBeNull();

    component.closeDetail();
    expect(component.selectedNodeId).toBeNull();
    expect(component.currentNode).toBeNull();
  });

  it("should handle invalid node ID gracefully", () => {
    component.selectNode("non-existent-node");
    expect(component.selectedNodeId).toBe("non-existent-node");
    expect(component.currentNode).toBeNull();
  });

  it("should render infrastructure cost breakdown in template", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain("Monthly Infrastructure Overhead");
    expect(compiled.textContent).toContain("~$0.60 USD / month");
    expect(compiled.textContent).toContain("AWS Route 53");
    expect(compiled.textContent).toContain("$0.54");
  });
});
