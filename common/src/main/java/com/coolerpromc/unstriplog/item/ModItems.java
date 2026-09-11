package com.coolerpromc.unstriplog.item;

import com.coolerpromc.unstriplog.platform.Services;
import com.coolerpromc.unstriplog.platform.util.ItemRegistryHandler;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.storage.loot.providers.number.ints.ContextIntProviders;

public class ModItems {
    // TODO: Register proper ContextIntProviders once NeoForge is ported
    public static final ItemRegistryHandler<Item> BARK = Services.REGISTRY.registerItem("bark", p -> new BarkItem(p.cookingFuel(ContextIntProviders.COOKING_TIME_WOOD_SLABS)));

    public static void load() {
    }
}
