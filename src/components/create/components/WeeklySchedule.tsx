"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { CreateEventFormData } from "../CreateEventForm"
import { Input } from "@/components/ui/input"

interface WeeklyScheduleProps {
  form: UseFormReturn<CreateEventFormData>
}

const daysOfWeek = [
  { key: "monday", label: "Lunes" },
  { key: "tuesday", label: "Martes" },
  { key: "wednesday", label: "Miércoles" },
  { key: "thursday", label: "Jueves" },
  { key: "friday", label: "Viernes" },
  { key: "saturday", label: "Sábado" },
  { key: "sunday", label: "Domingo" },
] as const

export function WeeklySchedule({ form }: WeeklyScheduleProps) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-base font-medium">Horario semanal</h4>
        <p className="text-sm text-muted-foreground">
          Selecciona los días y horarios disponibles
        </p>
      </div>

      <div className="space-y-3">
        {daysOfWeek.map((day) => {
          const enabledKey = `${day.key}_enabled` as const
          const startKey = `${day.key}_start` as const
          const endKey = `${day.key}_end` as const

          return (
            <div key={day.key} className="flex items-center space-x-4 p-3 border rounded-lg">
              {/* Checkbox de habilitación del día */}
              <FormField
                control={form.control}
                name={enabledKey}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="min-w-[80px] text-sm font-normal">{day.label}</FormLabel>
                  </FormItem>
                )}
              />

              {/* Inputs de horario si el día está habilitado */}
              {form.watch(enabledKey) && (
                <div className="flex items-center space-x-2 flex-1">
                  <FormField
                    control={form.control}
                    name={startKey}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="time" 
                            className="w-24" 
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <span className="text-muted-foreground text-sm">a</span>
                  <FormField
                    control={form.control}
                    name={endKey}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="time" 
                            className="w-24" 
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}