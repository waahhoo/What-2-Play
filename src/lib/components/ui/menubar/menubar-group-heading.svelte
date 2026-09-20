<script>
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	let {
		ref = $bindable(null),
		inset,
		class: className,
		...restProps
	} = $props();
</script>

<MenubarPrimitive.GroupHeading
	bind:ref
	data-slot="menubar-group-heading"
	data-inset={inset}
	class={cn("text-muted-foreground px-2 py-1 text-sm data-inset:pl-7", className)}
	{...restProps}
/>