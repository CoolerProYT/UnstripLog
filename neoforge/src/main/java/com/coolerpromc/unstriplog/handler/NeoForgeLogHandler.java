package com.coolerpromc.unstriplog.handler;

import com.coolerpromc.unstriplog.Constants;
import net.minecraft.world.InteractionResult;
import net.neoforged.bus.api.SubscribeEvent;
import net.neoforged.fml.common.EventBusSubscriber;
import net.neoforged.neoforge.event.TagsUpdatedEvent;
import net.neoforged.neoforge.event.entity.player.PlayerInteractEvent;
import net.neoforged.neoforge.event.server.ServerStartingEvent;

@EventBusSubscriber(modid = Constants.MODID)
public class NeoForgeLogHandler {
    @SubscribeEvent
    public static void onServerStarting(ServerStartingEvent event) {
        LogHandler.loadStrippables(event.getServer().registryAccess());
    }

    @SubscribeEvent
    public static void onClientTagsUpdated(TagsUpdatedEvent.ClientPacketReceived event) {
        if (event.shouldUpdateStaticData()) {
            LogHandler.loadStrippables(event.getRegistries());
        }
    }

    @SubscribeEvent
    public static void onStrip(PlayerInteractEvent.RightClickBlock event) {
        InteractionResult result = LogHandler.onStrip(event.getEntity(), event.getLevel(), event.getHand(), event.getHitVec());
        event.setCancellationResult(result);
        if (result == InteractionResult.SUCCESS) event.setCanceled(true);
    }

    @SubscribeEvent
    public static void onUnstrip(PlayerInteractEvent.RightClickBlock event) {
        InteractionResult result = LogHandler.onUnstrip(event.getEntity(), event.getLevel(), event.getHand(), event.getHitVec());
        event.setCancellationResult(result);
        if (result == InteractionResult.SUCCESS) event.setCanceled(true);
    }
}
