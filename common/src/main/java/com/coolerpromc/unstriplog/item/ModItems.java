package com.coolerpromc.unstriplog.item;

import com.coolerpromc.unstriplog.platform.Services;
import com.coolerpromc.unstriplog.platform.util.ItemRegistryHandler;
import com.coolerpromc.unstriplog.util.ModContextIntProviders;
import net.minecraft.world.item.Item;

public class ModItems {
    public static final ItemRegistryHandler<Item> BARK = Services.REGISTRY.registerItem("bark", p -> new BarkItem(p.cookingFuel(ModContextIntProviders.COOKING_TIME_BARK)));

    public static void load() {
    }
}
